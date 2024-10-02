import User from '@entities/User';
import BaseHook from './core/BaseHook';

export default class UserHook<T = User> extends BaseHook {}