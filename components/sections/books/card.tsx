import { format } from "date-fns";
import {
  Card,
  CardBody,
  CardCallouts,
  CardLink,
  CardObject,
  CardPlate,
  CardSource,
  CardTitle,
} from "@/components/ui/card";
import { Rating } from "@/components/ui/rating";

type BookStatus = "reading" | "finished" | "want-to-read" | (string & {});

const statusLabel: Record<string, string> = {
  reading: "Reading now",
  finished: "Finished",
  "want-to-read": "Want to read",
};

export interface BookCardProps {
  title: string;
  author: string;
  coverUrl?: string | null;
  status: BookStatus;
  rating?: number | null;
  finishedDate?: string | null;
  link?: string | null;
  note?: string;
}

export function BookCard(props: BookCardProps) {
  const inProgress = props.status === "reading";

  return (
    <Card as="article" interactive={Boolean(props.link)} className="h-full">
      <CardPlate>
        <CardObject
          shape="cover"
          src={props.coverUrl}
          alt={`${props.title} cover`}
          label={props.title}
        />
        <CardCallouts>
          <li
            className={
              inProgress
                ? "flex items-center gap-1.5 font-medium text-foreground"
                : undefined
            }
          >
            {inProgress ? (
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-brand" />
            ) : null}
            {statusLabel[props.status] ?? statusLabel.finished}
          </li>
          {typeof props.rating === "number" ? (
            <li>
              <Rating value={props.rating} />
            </li>
          ) : null}
          {props.finishedDate ? (
            <li>
              <time dateTime={props.finishedDate}>
                {format(new Date(props.finishedDate), "MMM yyyy")}
              </time>
            </li>
          ) : null}
        </CardCallouts>
      </CardPlate>

      <CardBody>
        <div>
          <CardTitle>{props.title}</CardTitle>
          <p className="mt-0.5 text-sm text-muted-foreground">{props.author}</p>
        </div>
        {props.note ? (
          <p className="text-sm leading-relaxed text-muted-foreground">
            {props.note}
          </p>
        ) : null}
        {props.link ? (
          <CardSource href={props.link} className="mt-auto pt-2 text-xs" />
        ) : null}
      </CardBody>

      {props.link ? (
        <CardLink href={props.link} label={`More about ${props.title}`} />
      ) : null}
    </Card>
  );
}
