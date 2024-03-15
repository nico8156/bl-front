import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'cleanText',
    standalone: true
})

export class CleanTextPipe implements PipeTransform{
    transform(value: any, ...args: any[]) {
       if(!value) return ''

       return value.replace(/<[^>]+>/g, '')
    }

}