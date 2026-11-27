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

const statusLabel: Record<string, string> = {
  playing: "Playing now",
  finished: "Finished",
  backlog: "Backlog",
  wishlist: "Wishlist",
};

const platformMap: Record<string, string> = {
  pc: "PC",
  playstation: "PlayStation",
  switch: "Switch",
  xbox: "Xbox",
  mobile: "Mobile",
};

export interface GameCardProps {
  title: string;
  coverUrl?: string | null;
  platform: string;
  status: string;
  rating?: number | null;
  hours?: number | null;
  link?: string | null;
  note?: string;
}

export function GameCard(props: GameCardProps) {
  const platform = platformMap[props.platform] ?? props.platform;
  const inProgress = props.status === "playing";

  return (
    <Card as="article" interactive={Boolean(props.link)} className="h-full">
      <CardPlate>
        <CardObject
          shape="keyart"
          src={props.coverUrl}
          alt={`${props.title} art`}
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
          <li>{platform}</li>
          {typeof props.hours === "number" ? (
            <li>
              {props.hours} {props.hours === 1 ? "hour" : "hours"}
            </li>
          ) : null}
        </CardCallouts>
      </CardPlate>

      <CardBody>
        <CardTitle>{props.title}</CardTitle>
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
