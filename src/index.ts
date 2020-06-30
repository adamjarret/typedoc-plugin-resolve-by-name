import { ResolveByNamePlugin } from './plugin';
import { PluginHost } from 'typedoc/dist/lib/utils';

export function load(pluginHost: PluginHost): void {
  const app = pluginHost.owner;

  app.converter.addComponent('resolve-by-name', ResolveByNamePlugin);
}
