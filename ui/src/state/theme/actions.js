import emoji from '@lewismoten/emoji';
import actionBuilder from '../actionBuilder';
const build = actionBuilder('theme', emoji.artistPalette);

export const change = build('change');
export const initialize = build('initialize');
export const uninitialize = build('uninitialize');