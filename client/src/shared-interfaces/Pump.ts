import Ingredient from '@/shared-interfaces/Ingredient';

export const PumpTypes: object = {
    LARGE_PERISTALTIC: 'large-peristaltic' as string,
};

export default interface Pump {
    isBusy: boolean;
    flowRate: number;
    pumpType: string;
    gpioPin: number;
    bottleVolume?: number;
    estimatedVolumeRemaining?: number;
    ingredient?: Ingredient;
}
