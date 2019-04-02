import { NavigationInterface } from '../navigation.interface';
import { SafeResourceUrl } from '@angular/platform-browser';

export interface ResourceCardInterface {
    title: string;
    resourceUrl: SafeResourceUrl;
    navigation: NavigationInterface
}