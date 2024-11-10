import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../api/api';

const useUpdateProfileMutation = () => {
    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: (formData: FormData) => api.auth.updateProfile(formData),
        onSuccess: () => {
            alert('업데이트 성공');
            queryClient.invalidateQueries({ queryKey: ['user'] });
        },
    });

    const submitFormData = (file: File, otherData: Record<string, string>) => {
        const formData = new FormData();
        formData.append('avatar', file);

        for (const [key, value] of Object.entries(otherData)) formData.append(key, value);
        mutate(formData);
    };

    return { submitFormData };
};

export default useUpdateProfileMutation;
