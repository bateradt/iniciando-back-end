import 'reflect-metadata';
import ListProvidersDayAvailiabilityService from '@modules/appointments/services/ListProvidersDayAvailiabilityService';
import FakeAppointmentsRepository from '@modules/appointments/repositories/fake/FakeAppointmentsRepository';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProvidersDayAvailiabilityService: ListProvidersDayAvailiabilityService;

describe('ListProvidersMonthAvailability', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        listProvidersDayAvailiabilityService = new ListProvidersDayAvailiabilityService(
            fakeAppointmentsRepository,
        );
    });

    it('should be able to list the hour availability from a day', async () => {
        await fakeAppointmentsRepository.create({
            provider_id: 'user', // mes 5 mas tem que passar 4 no parametro
            user_id: 'user',
            date: new Date(2020, 4, 20, 14, 0, 0), // constroi um objeto data, o mês é sempre um a menos que o número verdadeiro pois o javascript começa do 0 o array
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            user_id: 'user',
            date: new Date(2020, 4, 20, 15, 0, 0), // constroi um objeto data, o mês é sempre um a menos que o número verdadeiro pois o javascript começa do 0 o array
        });

        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 20, 11).getTime();
        });

        const monthListAvailability = await listProvidersDayAvailiabilityService.execute(
            {
                provider_id: 'user',
                day: 20,
                month: 5,
                year: 2020,
            },
        );

        expect(monthListAvailability).toEqual(
            expect.arrayContaining([
                { hour: 8, available: false },
                { hour: 9, available: false },
                { hour: 10, available: false },
                { hour: 13, available: true },
                { hour: 14, available: false },
                { hour: 15, available: false },
                { hour: 16, available: true },
            ]),
        );
    });
});
