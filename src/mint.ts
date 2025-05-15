export { app } from "./app/app";
export { deleteApp } from "./app/delete-app";

export { component } from "./nodes/component";
export { template } from "./nodes/template";
export { context } from "./nodes/context";
export { node } from "./nodes/node";

export { resolvePropTypes } from "./logic/prop-types/resolve-prop-types.service";

export { externalRefresh as refresh } from "./logic/refresh/refresh-common/external-refresh.logic";

export { mExtend } from "./mAttributes/mExtend";
export { mIf } from "./mAttributes/mIf";
export { mFor } from "./mAttributes/mFor";
export { mRef } from "./mAttributes/mRef";

export { Store } from "./store/Store";

export { MintScope } from "./models/MintScope.model";
export { UpwardRef } from "./models/UpwardRef.model";
export { Resolver } from "./models/scope-transformers/Resolver.model";
export { GetContext } from "./models/scope-transformers/GetContext.model";

export { span } from "./quick-elements/span.element";
export { div } from "./quick-elements/div.element";

export { MintEvent } from "./types/MintEvent.type";
export { TRawContent as TMintContent } from "./types/TRawContent.type";
export { TNode } from "./types/TNode.type";
// ** Don't do this:
// export { MintTemplate } from "./models/mint-nodes/MintTemplate.model";
export { MintElement } from "./models/mint-nodes/MintElement.model";
export { MintComponent } from "./models/mint-nodes/MintComponent.model";

// ** Don't do this:
// content: MintTemplate
// this.content = template(() => node())

// ** Do this instead:
// content: TMintContent
// this.content = () => node()
