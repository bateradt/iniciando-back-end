import FakeAppointmentsRepository from '@modules/appointments/repositories/fake/FakeAppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import FakeNotificationsRepository from '@modules/notifications/repositories/fake/FakeNotificationsRepository';
import AppError from '@shared/errors/AppError';

// test('sum tow number', () => {
//     expect(1 + 2).toBe(3);
// });

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeNotificationsRepository: FakeNotificationsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        fakeNotificationsRepository = new FakeNotificationsRepository();
        createAppointment = new CreateAppointmentService(
            fakeAppointmentsRepository,
            fakeNotificationsRepository,
        );
    });

    it('should be able to create a new appointment', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 7, 3, 11).getTime(); // criei uma data no dia 03/08/2020 as 12hrs
        });

        const appointment = await createAppointment.execute({
            date: new Date(2020, 7, 3, 13),
            user_id: '12345678',
            provider_id: '123456789',
        });

        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe('123456789');
    });

    it('should not be able to create a new appointment on the same date', async () => {
        const appointmentDate = new Date(2020, 7, 3, 12); // criei uma data no dia 03/08/2020 as 12hrs

        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 7, 3, 10).getTime(); // criei uma data no dia 03/08/2020 as 12hrs
        });

        await createAppointment.execute({
            date: appointmentDate,
            user_id: '12345678',
            provider_id: '123456789',
        });

        await expect(
            createAppointment.execute({
                date: appointmentDate,
                user_id: '12345678',
                provider_id: '123456789',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create a new appointment on a past date', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 7, 3, 12).getTime(); // criei uma data no dia 03/08/2020 as 12hrs
        });

        await expect(
            createAppointment.execute({
                date: new Date(2020, 7, 3, 11),
                user_id: '12345678',
                provider_id: '123456789',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create a new appointment for the same user as a provider', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 7, 3, 12).getTime(); // criei uma data no dia 03/08/2020 as 12hrs
        });

        await expect(
            createAppointment.execute({
                date: new Date(2020, 7, 3, 13),
                user_id: '12345678',
                provider_id: '12345678',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create a new appointment before the 8:00am', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 7, 3, 6).getTime(); // criei uma data no dia 03/08/2020 as 6hrs
        });

        await expect(
            createAppointment.execute({
                date: new Date(2020, 7, 3, 7),
                user_id: '12345678',
                provider_id: '123456789',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should be able to create a new appointment at the 8:00am', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 7, 3, 6).getTime(); // criei uma data no dia 03/08/2020 as 7hrs
        });

        const appointmentDate = new Date(2020, 7, 3, 8);
        const appointment = await createAppointment.execute({
            date: appointmentDate,
            user_id: '12345678',
            provider_id: '123456789',
        });

        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe('123456789');
        expect(appointment.date).toEqual(appointmentDate);
    });

    it('should not be able to create a new appointment after the 18:00pm', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 7, 3, 18).getTime(); // criei uma data no dia 03/08/2020 as 12hrs
        });

        await expect(
            createAppointment.execute({
                date: new Date(2020, 7, 3, 19),
                user_id: '12345678',
                provider_id: '123456789',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create a new appointment after the 17:00pm', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 7, 3, 17).getTime(); // criei uma data no dia 03/08/2020 as 12hrs
        });

        await expect(
            createAppointment.execute({
                date: new Date(2020, 7, 3, 18),
                user_id: '12345678',
                provider_id: '123456789',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create a new appointment at the 18:00pm', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 7, 3, 17).getTime(); // criei uma data no dia 03/08/2020 as 12hrs
        });

        await expect(
            createAppointment.execute({
                date: new Date(2020, 7, 3, 18),
                user_id: '12345678',
                provider_id: '123456789',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should be able to create a new appointment at the 17:00pm', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 7, 3, 15).getTime(); // criei uma data no dia 03/08/2020 as 12hrs
        });

        const appointmentDate = new Date(2020, 7, 3, 17);
        const appointment = await createAppointment.execute({
            date: appointmentDate,
            user_id: '12345678',
            provider_id: '123456789',
        });

        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe('123456789');
        expect(appointment.date).toEqual(appointmentDate);
    });
});
