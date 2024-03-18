import { MintComponent } from "../../models/MintComponent.model";

import { TMintContent } from "../../types/TMintContent.type";

export interface IComponent {
  component: MintComponent;
  props: Object;
  content: Array<TMintContent>;
}
