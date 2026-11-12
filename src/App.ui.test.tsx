import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeAll, describe, expect, test, vi } from "vitest";

import App from "./App";

// jsdom does not implement the modal methods of <dialog>, so stub them.
beforeAll(() => {
  HTMLDialogElement.prototype.showModal ??= function (this: HTMLDialogElement) {
    this.setAttribute("open", "");
  };
  HTMLDialogElement.prototype.close ??= function (this: HTMLDialogElement) {
    this.removeAttribute("open");
  };
});

function setup() {
  const user = userEvent.setup();
  render(<App />);
  return { user };
}

test("adds a book and shows a toast", async () => {
  const { user } = setup();
  await user.click(screen.getByRole("button", { name: "+ Add book" }));

  const dialog = await screen.findByRole("dialog", { name: "Add book" });
  expect(within(dialog).getByLabelText("Title")).toHaveFocus();

  await user.type(within(dialog).getByLabelText("Title"), "The Left Hand of Darkness");
  await user.type(within(dialog).getByLabelText("Author"), "Ursula K. Le Guin");
  await user.selectOptions(within(dialog).getByLabelText("Rating"), "4");
  await user.click(within(dialog).getByRole("button", { name: "Save" }));

  expect(await screen.findByText("Book added")).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "The Left Hand of Darkness" })).toBeInTheDocument();
  expect(screen.getAllByRole("listitem")).toHaveLength(11);
});

test("does not save without title and author", async () => {
  const { user } = setup();
  await user.click(screen.getByRole("button", { name: "+ Add book" }));
  const dialog = await screen.findByRole("dialog");

  await user.click(within(dialog).getByRole("button", { name: "Save" }));

  expect(within(dialog).getByText("Please enter a title.")).toBeVisible();
  expect(within(dialog).getByLabelText("Title")).toHaveFocus();
  expect(screen.getByRole("dialog")).toBeInTheDocument();
  expect(screen.getAllByRole("listitem")).toHaveLength(10);
});

test("edits a book", async () => {
  const { user } = setup();
  await user.click(screen.getByRole("button", { name: "Edit Dune" }));
  const dialog = await screen.findByRole("dialog", { name: "Edit book" });

  const title = within(dialog).getByLabelText("Title");
  await user.clear(title);
  await user.type(title, "Dune Messiah");
  await user.click(within(dialog).getByRole("button", { name: "Save" }));

  expect(await screen.findByText("Book updated")).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "Dune Messiah" })).toBeInTheDocument();
});

test("deletes a book after confirmation", async () => {
  const { user } = setup();
  await user.click(screen.getByRole("button", { name: "Delete Dune" }));
  const dialog = await screen.findByRole("dialog", { name: "Delete book" });
  expect(within(dialog).getByRole("button", { name: "Cancel" })).toHaveFocus();

  await user.click(within(dialog).getByRole("button", { name: "Delete" }));

  expect(await screen.findByText("Book deleted")).toBeInTheDocument();
  expect(screen.queryByRole("heading", { name: "Dune" })).not.toBeInTheDocument();
  expect(screen.getAllByRole("listitem")).toHaveLength(9);
  await waitFor(() => expect(screen.getByRole("heading", { name: "9 books" })).toHaveFocus());
});

test("filter and search work together and show the empty state", async () => {
  const { user } = setup();
  await user.click(screen.getByRole("radio", { name: "Done" }));
  await user.type(screen.getByLabelText("Search by title"), "dune");

  expect(screen.getAllByRole("listitem")).toHaveLength(1);

  await user.click(screen.getByRole("radio", { name: "Reading" }));
  expect(screen.queryAllByRole("listitem")).toHaveLength(0);
  expect(screen.getByText("No books match your search or filter.")).toBeInTheDocument();

  await user.click(screen.getByRole("button", { name: "Clear filters" }));
  expect(screen.getAllByRole("listitem")).toHaveLength(10);
});

test("Escape closes the dialog and returns focus to the trigger", async () => {
  const { user } = setup();
  const addButton = screen.getByRole("button", { name: "+ Add book" });
  await user.click(addButton);
  await screen.findByRole("dialog");

  await user.keyboard("{Escape}");

  await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  expect(addButton).toHaveFocus();
});

describe("dark mode", () => {
  afterEach(() => {
    document.documentElement.classList.remove("dark");
    vi.unstubAllGlobals();
  });

  test("the toggle switches the theme and remembers the choice", async () => {
    const { user } = setup();
    const toggle = screen.getByRole("button", { name: "Dark mode" });
    expect(toggle).toHaveAttribute("aria-pressed", "false");
    expect(document.documentElement).not.toHaveClass("dark");

    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-pressed", "true");
    expect(document.documentElement).toHaveClass("dark");
    expect(localStorage.getItem("reading-list:theme")).toBe("dark");

    // Back to the system theme (light): the choice is cleared.
    await user.click(toggle);
    expect(document.documentElement).not.toHaveClass("dark");
    expect(localStorage.getItem("reading-list:theme")).toBeNull();
  });

  test("follows the system setting when nothing is stored", () => {
    vi.stubGlobal("matchMedia", (query: string) => ({
      matches: query === "(prefers-color-scheme: dark)",
      addEventListener: () => {},
      removeEventListener: () => {},
    }));
    setup();
    expect(document.documentElement).toHaveClass("dark");
    expect(screen.getByRole("button", { name: "Dark mode" })).toHaveAttribute(
      "aria-pressed",
      "true"
    );
  });
});
