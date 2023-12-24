import { setCookie } from "cookies-next";
import { httpClient } from "./http-client";
import {
  EventInput,
  Event,
  EventListResponse,
  Participant,
  ParticipantInput,
  LoginResponse,
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
  login(
    body: { email: string; passoword: string },
    reqInit?: RequestInit
  ): Promise<LoginResponse> {
    return httpClient
      .post(`api/v1/login`, body, reqInit)
      .then((res) => responseAdapter<LoginResponse>(res))
      .then((data) => {
        setCookie("accessToken", data.accessToken);
        return data;
      });
  },
};
