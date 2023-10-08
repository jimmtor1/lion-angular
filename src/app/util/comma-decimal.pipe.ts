import { Pipe, PipeTransform } from '@angular/core';
import { formatCurrency, getCurrencySymbol } from '@angular/common';

@Pipe({
    name: 'commaDecimal'
})
export class CommaDecimalPipe implements PipeTransform {
    transform(value: number): string {
        if (Number.isInteger(value) || value % 1 === 0) {
            return value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        } else {
            return value.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        }
    }
}