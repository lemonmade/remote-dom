import {createRemoteElement} from '@lemonmade/remote-ui/elements';

const UIButton = createRemoteElement({
  properties: {
    emphasis: {type: Boolean},
    onPress: {event: true},
  },
});

customElements.define('ui-button', UIButton);
