const MAX_RATING = 5;

type StarRatingProps = {
  rating: number | null;
};

export default function StarRating({ rating }: StarRatingProps) {
  if (rating === null) {
    return <span className="small text-body-secondary">Not rated</span>;
  }

  return (
    <span className="text-star">
      <span aria-hidden="true">
        {"★".repeat(rating)}
        {"☆".repeat(MAX_RATING - rating)}
      </span>
      <span className="visually-hidden">
        {rating} of {MAX_RATING} stars
      </span>
    </span>
  );
}
