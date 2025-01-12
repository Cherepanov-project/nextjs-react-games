import { normalChallengeDifficulty } from '../../const/challenge-difficulty-levels';
import { DifficultyForm, InputData } from '../../../../components/difficulty-form/difficulty-form';
import { InputNumber } from '../../../../components/input-number/input-number';

const formData: InputData[] = [
  {
    name: 'lifetime',
    label: 'Target lifetime (ms)',
    component: <InputNumber min={2000} max={20000} step={100} />,
  },
  {
    label: 'Target Size (px)',
    name: 'targetSize',
    component: <InputNumber min={20} max={200} step={10} />,
  },
  {
    label: 'Max Target Count',
    name: 'maxTargetCount',
    component: <InputNumber min={3} max={30} />,
  },
  {
    label: 'Lives Count',
    name: 'lives',
    component: <InputNumber min={1} max={7} step={1} />,
  },
  {
    label: 'Targets per second',
    name: 'defaultSpeed',
    component: <InputNumber min={1} max={10} step={0.01} />,
  },
  {
    label: 'Increase speed every second by',
    name: 'speedIncrementPerSecond',
    component: <InputNumber min={0.01} max={1} step={0.01} />,
  },
];

export const ChallengeCustomDifficultyForm = () => {
  return <DifficultyForm defaultValues={normalChallengeDifficulty} formData={formData} />;
};
