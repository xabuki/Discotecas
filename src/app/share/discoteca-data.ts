import { InMemoryDbService } from 'angular-in-memory-web-api';

export class DiscotecaData implements InMemoryDbService {

  createDb() {
      let discotecas =[
        {
            id: '1',
            name: 'Indara',
            cover:
              'https://owaytours.com/blog/wp-content/uploads/2019/08/discotecas-cordoba-min.jpg',
            description: "Indara es una discoteca localizada al lado de la estacion de autobuses en pamplona"
          },
          {
            id: '2',
            name: 'Klabe',
            cover: 'https://www.bilbaoplan.com/wp-content/uploads/2016/04/discoteca-1.jpg',
            description: "clave es una discoteca que se encuentra en pamplona"
          }
      ];
      return { discotecas: discotecas };
  }
}