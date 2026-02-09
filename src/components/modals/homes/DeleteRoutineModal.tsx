import { useHomeDateStore } from '@/stores/homes/homeStore';
import useBaseModal from '@/stores/modals/baseModal';
import { useRoutineStore } from '@/stores/routines/routineStore';
import type { DeleteRoutineRequest } from '@/types/routines/Routine.types';
import { formatDate } from '@/utils/homes/homeUtils';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type DeleteOption = 'CURRENT' | 'AFTER' | 'ALL';

type Props = {
  memberRoutineId: string | number;
};

const toServerDeleteType = (
  v: DeleteOption
): DeleteRoutineRequest['deleteType'] => {
  if (v === 'CURRENT') return 'ONLY_SET';
  if (v === 'AFTER') return 'AFTER_SET';
  return 'ALL_SET';
};

const DeleteRoutineModal = ({ memberRoutineId }: Props) => {
  const { closeModal } = useBaseModal();
  const navigate = useNavigate();

  const { deleteRoutine, isLoading } = useRoutineStore();

  const { selectedDate } = useHomeDateStore();

  const id = Number(memberRoutineId);

  const [selected, setSelected] = useState<DeleteOption | null>(null);

  const isSelected = selected !== null;

  const requestBody: DeleteRoutineRequest | null = useMemo(() => {
    if (!selected) return null;

    return {
      deleteType: toServerDeleteType(selected),
      targetDate: formatDate(selectedDate),
    };
  }, [selected, selectedDate]);

  const handleSelect = (value: DeleteOption) => {
    setSelected((prev) => (prev === value ? null : value));
  };

  const renderItem = (label: string, value: DeleteOption) => {
    const isSelected = selected === value;
    return (
      <div
        role="button"
        onClick={() => handleSelect(value)}
        className={`w-full px-4 py-4 rounded-lg typo-body_bold16 transition-colors
          ${
            isSelected
              ? 'bg-primary-10 text-primary-50 border border-primary-50 shadow-mini'
              : selected
                ? 'bg-gray-50 text-gray-200'
                : 'bg-gray-50 text-gray-500'
          }`}
      >
        {label}
      </div>
    );
  };

  const handleDelete = async () => {
    if (!requestBody) return;
    if (!Number.isFinite(id)) return;
    if (isLoading) return;

    try {
      await deleteRoutine(id, requestBody);
      closeModal();
      navigate('/lived', { replace: true });
    } catch (e) {
      console.error('루틴 삭제 실패', e);
    }
  };

  return (
    <div className="bg-white px-4 pt-10 pb-11 rounded-t-2xl flex flex-col gap-9">
      <div className="flex flex-col gap-2.5">
        {renderItem('해당 일정 삭제', 'CURRENT')}
        {renderItem('이후 일정 삭제', 'AFTER')}
        {renderItem('모든 일정 삭제', 'ALL')}
      </div>

      <div
        role="button"
        className={`w-full rounded-full typo-body_bold18 py-3 text-center ${isSelected ? 'bg-primary-50 text-screen-0' : 'bg-gray-100 text-gray-400'}
        `}
        onClick={handleDelete}
      >
        삭제하기
      </div>
    </div>
  );
};

export default DeleteRoutineModal;
