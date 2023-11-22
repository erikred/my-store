import { CanDeactivateFn } from '@angular/router';
import { RegisterComponent } from '../website/pages/register/register.component';


export const exitGuard: CanDeactivateFn<unknown> = (component, currentRoute, currentState, nextState) => {

  const registerComponent:RegisterComponent = new RegisterComponent;

  return registerComponent.onExit();
};
