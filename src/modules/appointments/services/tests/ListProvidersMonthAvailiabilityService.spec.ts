import 'reflect-metadata';
import ListProvidersMonthAvailiabilityService from '@modules/appointments/services/ListProvidersMonthAvailiabilityService';
import FakeAppointmentsRepository from '@modules/appointments/repositories/fake/FakeAppointmentsRepository';
// import AppError from '@shared/errors/AppError';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProvidersMonthAvailabilityService: ListProvidersMonthAvailiabilityService;

describe('ListProvidersMonthAvailability', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        listProvidersMonthAvailabilityService = new ListProvidersMonthAvailiabilityService(
            fakeAppointmentsRepository,
        );
    });

    it('should be able to list the month availability from provider', async () => {
        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            user_id: 'user',
            date: new Date(2020, 3, 20, 8, 0, 0), // constroi um objeto data, o mês é sempre um a menos que o número verdadeiro pois o javascript começa do 0 o array
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            user_id: 'user',
            date: new Date(2020, 4, 20, 8, 0, 0), // constroi um objeto data, o mês é sempre um a menos que o número verdadeiro pois o javascript começa do 0 o array
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            user_id: 'user',
            date: new Date(2020, 4, 20, 9, 0, 0), // constroi um objeto data, o mês é sempre um a menos que o número verdadeiro pois o javascript começa do 0 o array
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            user_id: 'user',
            date: new Date(2020, 4, 20, 10, 0, 0), // constroi um objeto data, o mês é sempre um a menos que o número verdadeiro pois o javascript começa do 0 o array
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            user_id: 'user',
            date: new Date(2020, 4, 20, 11, 0, 0), // constroi um objeto data, o mês é sempre um a menos que o número verdadeiro pois o javascript começa do 0 o array
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            user_id: 'user',
            date: new Date(2020, 4, 20, 12, 0, 0), // constroi um objeto data, o mês é sempre um a menos que o número verdadeiro pois o javascript começa do 0 o array
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            user_id: 'user',
            date: new Date(2020, 4, 20, 13, 0, 0), // constroi um objeto data, o mês é sempre um a menos que o número verdadeiro pois o javascript começa do 0 o array
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            user_id: 'user',
            date: new Date(2020, 4, 20, 14, 0, 0), // constroi um objeto data, o mês é sempre um a menos que o número verdadeiro pois o javascript começa do 0 o array
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            user_id: 'user',
            date: new Date(2020, 4, 20, 15, 0, 0), // constroi um objeto data, o mês é sempre um a menos que o número verdadeiro pois o javascript começa do 0 o array
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            user_id: 'user',
            date: new Date(2020, 4, 20, 16, 0, 0), // constroi um objeto data, o mês é sempre um a menos que o número verdadeiro pois o javascript começa do 0 o array
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            user_id: 'user',
            date: new Date(2020, 4, 20, 17, 0, 0), // constroi um objeto data, o mês é sempre um a menos que o número verdadeiro pois o javascript começa do 0 o array
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            user_id: 'user',
            date: new Date(2020, 4, 21, 8, 0, 0), // constroi um objeto data, o mês é sempre um a menos que o número verdadeiro pois o javascript começa do 0 o array
        });

        const monthListAvailability = await listProvidersMonthAvailabilityService.execute(
            {
                provider_id: 'user',
                month: 5,
                year: 2020,
            },
        );

        expect(monthListAvailability).toEqual(
            expect.arrayContaining([
                { day: 19, available: true },
                { day: 20, available: false },
                { day: 21, available: true },
                { day: 22, available: true },
            ]),
        );
    });
});
