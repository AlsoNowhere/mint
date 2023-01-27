import { MintComponent } from "../../models/MintComponent.model";
import { MintElement } from "../../models/MintElement.model";

export interface IComponent {
  // component: MintComponent | (() => MintComponent);
  component: MintComponent;
  props: Object;
  content: Array<MintElement | string>;
}
