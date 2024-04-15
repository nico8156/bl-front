import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'cleanText',
    standalone: true
})

export class CleanTextPipe implements PipeTransform{
    /**
     * Ce custom pipe élimine les balises HTML supperflues trouvées dans les donnees provenant de L'api google books
     */
   
    transform(value: any, ...args: any[]) {
       if(!value) return ''
       return value.replace(/<[^>]+>/g, '')
    }

}