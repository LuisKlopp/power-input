import { User } from '@/types/userData';
import { englishData } from '@/data/englishData';

export const handler = async (inputData: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    const jsonFilter = englishData.filter((data) =>
      data.name.includes(inputData)
    );
    // 정적 데이터를 여기에 입력합니다.
    if (jsonFilter) {
      resolve(jsonFilter);
    } else {
      reject('데이터 없습니당');
    }
  });
};
