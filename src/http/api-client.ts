import { httpClient } from "./http-client";
import {
  EventInput,
  Event,
  EventListResponse,
  Participant,
  ParticipantInput,
} from "types/event";

const responseAdapter = <T>(res: Response) => {
  if (res.ok) return res.json() as Promise<T>;
  else throw res;
};
export const ApiClient = {
  getEvents(): Promise<EventListResponse> {
    return httpClient
      .get("api/v1/events/list")
      .then((res) => responseAdapter<EventListResponse>(res));
  },
  createEvent(eventInput: EventInput): Promise<Event> {
    return httpClient
      .post("api/v1/events", eventInput)
      .then((res) => responseAdapter<Event>(res));
  },
  createParticipant(participantInput: ParticipantInput): Promise<Participant> {
    return httpClient
      .post("api/v1/participant", participantInput)
      .then((res) => responseAdapter<Participant>(res));
  },
};
