import { RootStateType } from '../rootStateType';

export const selectIsModalOpen = (state: RootStateType) => state.common.open;
