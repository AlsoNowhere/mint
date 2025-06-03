import { assignProps } from "../../logic/common/assign-props.logic";

import { MintAttribute } from "./MintAttribute.model";

export class MintProps extends MintAttribute {
  constructor(exceptions: Array<string> = []) {
    super(() => new MintProps(exceptions));

    this.onGenerate = function (options) {
      const { scope, parentBlueprint } = options;

      // ** We only want to do something if the parentBlueprint exists.
      if (parentBlueprint !== null && parentBlueprint.props !== undefined) {
        // ** Here we take a copy of the parent props.
        const exceptedParentProps = { ...parentBlueprint.props };

        // ** We then remove the props we have on our provided list of exceptions.
        for (let item of exceptions) {
          delete exceptedParentProps[item];
        }

        // ** Here we assign the parent props on to this Node.
        assignProps(scope, Object.keys(exceptedParentProps), exceptedParentProps, parentBlueprint.scope);
      }

      return {
        condition: false
      };
    };

    this.onRefresh = function (options) {
      const { scope, parentBlueprint } = options;

      // ** We only want to do something if the parentBlueprint exists.
      if (parentBlueprint !== null && parentBlueprint.props !== undefined) {
        // ** Here we take a copy of the parent props.
        const exceptedParentProps = { ...parentBlueprint.props };

        // ** We then remove the props we have on our provided list of exceptions.
        for (let item of exceptions) {
          delete exceptedParentProps[item];
        }

        // ** Here we assign the parent props on to this Node.
        assignProps(scope, Object.keys(exceptedParentProps), exceptedParentProps, parentBlueprint.scope);
      }
      return {
        condition: false
      };
    };
  }
}
