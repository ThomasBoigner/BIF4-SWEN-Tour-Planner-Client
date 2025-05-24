import { TransportType } from '../transportType';
import { CreateAddressCommand } from './createAddressCommand';

export interface CreateTourCommand {
    name: string;
    description: string;
    from: CreateAddressCommand;
    to: CreateAddressCommand;
    transportType: TransportType;
}
