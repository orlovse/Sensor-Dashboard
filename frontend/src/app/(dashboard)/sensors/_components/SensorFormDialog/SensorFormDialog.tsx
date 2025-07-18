'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog } from 'radix-ui';
import styles from './SensorFormDialog.module.css';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useSensorMutations } from '@/hooks/useSensors';

const schema = z.object({
	name: z.string().min(2),
	location: z.string().optional(),
});
type FormData = z.infer<typeof schema>;

export default function SensorFormDialog({ open, onOpenChange, initial }: {
	open: boolean;
	onOpenChange: (v: boolean) => void;
	initial?: { id: number; name: string; location?: string };
}) {
	const { create, update } = useSensorMutations();
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<FormData>({
		resolver: zodResolver(schema),
		defaultValues: initial ?? { name: '', location: '' },
	});

	const onSubmit = (data: FormData) => {
		const action = initial ? update.mutateAsync({ id: initial.id, data }) : create.mutateAsync(data);
		action.then(() => onOpenChange(false));
	};

        return (
                <Dialog.Root open={open} onOpenChange={onOpenChange}>
                        <Dialog.Portal>
                                <Dialog.Overlay className={styles.overlay} />
                                <Dialog.Content className={styles.content}>
                                        <Dialog.Title className={styles.title}>
                                                {initial ? 'Edit sensor' : 'New sensor'}
                                        </Dialog.Title>
                                        <Dialog.Description id="sensor-desc">
                                                {initial ? 'Update sensor parameters.' : 'Create a new sensor.'}
                                        </Dialog.Description>
                                        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                                                <input placeholder="Name" {...register('name')} />
                                                {errors.name && <span>{errors.name.message}</span>}
                                                <input placeholder="Location" {...register('location')} />
                                                <button disabled={isSubmitting}>{initial ? 'Save' : 'Create'}</button>
                                        </form>
                                </Dialog.Content>
                        </Dialog.Portal>
                </Dialog.Root>
        );
}
