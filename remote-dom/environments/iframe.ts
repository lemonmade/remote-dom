import {createIframeEnvironment} from '@lemonmade/remote-dom/environments/iframe';

const {element} = await createIframeEnvironment();

export {element, element as root};
