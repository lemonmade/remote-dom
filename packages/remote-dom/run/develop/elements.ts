import {createRemoteElement} from '@lemonmade/remote-ui/elements';

export interface UIButtonProperties {
  emphasis?: boolean;
  onPress?(): void;
}

const UIButton = createRemoteElement<UIButtonProperties>({
  properties: {
    emphasis: {type: Boolean},
    onPress: {event: true},
  },
});

customElements.define('ui-button', UIButton);

declare global {
  interface HTMLElementTagNameMap {
    'ui-button': InstanceType<typeof UIButton>;
  }
}
