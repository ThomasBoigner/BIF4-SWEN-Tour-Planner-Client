import { TransportType } from '../transport-type';
import { CreateAddressCommand } from './create-address-command';

export interface CreateTourCommand {
    name: string;
    description: string;
    from: CreateAddressCommand;
    to: CreateAddressCommand;
    transportType: TransportType;
}
