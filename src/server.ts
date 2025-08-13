import fastify from "fastify";
import cors from "@fastify/cors";

const server = fastify({logger: true});

server.register(cors, {
    origin: '*',
});

interface F1Team {
  id: number;
  name: string;
  base: string;
  engine?: string;
}

const teams: F1Team[] = [
  { id: 1, name: 'Mercedes-AMG Petronas F1 Team', base: 'Brackley, UK', engine: 'Mercedes' },
  { id: 2, name: 'Scuderia Ferrari', base: 'Maranello, Italy', engine: 'Ferrari' },
  { id: 3, name: 'Oracle Red Bull Racing', base: 'Milton Keynes, UK', engine: 'Honda RBPT' },
  { id: 4, name: 'McLaren F1 Team', base: 'Woking, UK', engine: 'Mercedes' },
  { id: 5, name: 'Aston Martin Aramco F1 Team', base: 'Silverstone, UK', engine: 'Mercedes' },
  { id: 6, name: 'BWT Alpine F1 Team', base: 'Enstone, UK', engine: 'Renault' },
  { id: 7, name: 'Williams Racing', base: 'Grove, UK', engine: 'Mercedes' },
  { id: 8, name: 'Visa Cash App RB F1 Team', base: 'Faenza, Italy', engine: 'Honda RBPT' },
  { id: 9, name: 'Stake F1 Team Kick Sauber', base: 'Hinwil, Switzerland', engine: 'Ferrari' },
  { id: 10, name: 'MoneyGram Haas F1 Team', base: 'Kannapolis, USA', engine: 'Ferrari' }
];

interface F1Driver {
  id: number;
  name: string;
  team: string;
  country: string;
  number: number;
}

const drivers: F1Driver[] = [
  { id: 1, name: 'Max Verstappen', team: 'Oracle Red Bull Racing', country: 'Netherlands', number: 1 },
  { id: 2, name: 'Lewis Hamilton', team: 'Mercedes-AMG Petronas F1 Team', country: 'United Kingdom', number: 44 },
  { id: 3, name: 'Charles Leclerc', team: 'Scuderia Ferrari', country: 'Monaco', number: 16 },
  { id: 4, name: 'George Russell', team: 'Mercedes-AMG Petronas F1 Team', country: 'United Kingdom', number: 63 },
  { id: 5, name: 'Sergio Pérez', team: 'Oracle Red Bull Racing', country: 'Mexico', number: 11 },
  { id: 6, name: 'Lando Norris', team: 'McLaren F1 Team', country: 'United Kingdom', number: 4 },
  { id: 7, name: 'Carlos Sainz', team: 'Scuderia Ferrari', country: 'Spain', number: 55 },
  { id: 8, name: 'Oscar Piastri', team: 'McLaren F1 Team', country: 'Australia', number: 81 },
  { id: 9, name: 'Fernando Alonso', team: 'Aston Martin Aramco F1 Team', country: 'Spain', number: 14 },
  { id: 10, name: 'Lance Stroll', team: 'Aston Martin Aramco F1 Team', country: 'Canada', number: 18 },
  { id: 11, name: 'Pierre Gasly', team: 'BWT Alpine F1 Team', country: 'France', number: 10 },
  { id: 12, name: 'Esteban Ocon', team: 'BWT Alpine F1 Team', country: 'France', number: 31 },
  { id: 13, name: 'Alexander Albon', team: 'Williams Racing', country: 'Thailand', number: 23 },
  { id: 14, name: 'Logan Sargeant', team: 'Williams Racing', country: 'United States', number: 2 },
  { id: 15, name: 'Yuki Tsunoda', team: 'Visa Cash App RB F1 Team', country: 'Japan', number: 22 },
  { id: 16, name: 'Daniel Ricciardo', team: 'Visa Cash App RB F1 Team', country: 'Australia', number: 3 },
  { id: 17, name: 'Valtteri Bottas', team: 'Stake F1 Team Kick Sauber', country: 'Finland', number: 77 },
  { id: 18, name: 'Zhou Guanyu', team: 'Stake F1 Team Kick Sauber', country: 'China', number: 24 },
  { id: 19, name: 'Nico Hülkenberg', team: 'MoneyGram Haas F1 Team', country: 'Germany', number: 27 },
  { id: 20, name: 'Kevin Magnussen', team: 'MoneyGram Haas F1 Team', country: 'Denmark', number: 20 }
];

server.get('/teams', async (request, response) => {
  response.type('application/json').code(200);
  return teams;
});


server.get('/drivers', async (request, response) => {
  response.type('application/json').code(200);
  return drivers;
});

interface DriverParams {
  id: string;
}

server.get<{Params: DriverParams}>('/drivers/:id', async (request, response) => {
    const id = parseInt(request.params.id);
    const driver: F1Driver | undefined = drivers.find(d => d.id === id);
    if (!driver) {
        response.type('application/json').code(404);
        return { error: 'Driver not found' };
    }
    response.type('application/json').code(200);
    return driver;
});

server.listen({port: 3333}, () => {
    console.log('Server initialized on http://localhost:3333');
})