import { IState } from "@typings/state/index";

export const selectIsAdmin = (state: IState): boolean =>
  state.router.location.pathname === "/admin";
