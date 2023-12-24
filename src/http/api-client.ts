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
  getEvents(reqInit?: RequestInit): Promise<EventListResponse> {
    return httpClient
      .get(`api/v1/events/list`, reqInit)
      .then((res) => responseAdapter<EventListResponse>(res));
  },
  createEvent(eventInput: EventInput, reqInit?: RequestInit): Promise<Event> {
    return httpClient
      .post("api/v1/events", eventInput, reqInit)
      .then((res) => responseAdapter<Event>(res));
  },
  createParticipant(
    participantInput: ParticipantInput,
    reqInit?: RequestInit
  ): Promise<Participant> {
    return httpClient
      .post("api/v1/participant", participantInput, reqInit)
      .then((res) => responseAdapter<Participant>(res));
  },
  updateParticipant(
    id: string,
    input: { isPaid: boolean },
    reqInit?: RequestInit
  ): Promise<Participant> {
    return httpClient
      .put(`api/v1/participant/${id}`, input, reqInit)
      .then((res) => responseAdapter<Participant>(res));
  },
};
