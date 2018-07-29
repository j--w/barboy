import Pump from '@/shared-interfaces/Pump';

export default interface BarState {
    isBusy: boolean;
    pumps: Pump[];
}
