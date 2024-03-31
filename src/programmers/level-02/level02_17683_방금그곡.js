import { generateTestPair } from '../../utils.js';

/**
 * [요구사항]
 * 기억한 멜로디를 재생 시간과 제공된 악보를 직접 비교하면서 찾으려는 음악의 제목 반환
 *
 * 악보에 사용되는 음: C, C#, D, D#, E, F, F#, G, G#, A, A#, B
 * 각 음은 1분에 1개씩 처음부터 재생
 * 음악은 항상 처음부터 재생되고, 음악 길이보다 재생된 시간이 길 때는 처음부터 반복해서 재생
 * 음악 길이보다 재생 시간이 짧을 때는 처음부터 재생 시간만큼만 재생
 * 조건이 일치하는 음이 여러 개일 때는 라디오에서 재생된 시간이 가장 긴 음악 제목 반환
 * 재생된 시간이 같을 땐 먼저 입력된 음악 제목 반환
 * 조건이 일치하는 음악이 없을 땐 "(None)" 반환
 *
 * [파라미터]
 * m: 네오가 기억한 멜로디를 담은 문자열 m, 1 <= m <= 1439
 * musicinfos: 곡 정보를 담고 있는 100개 이하 배열
 * - 각 곡 정보는 시작 시각(HH:MM), 끝난 시각(HH:MM), 음악 제목(1~64), 악보 정보(1~1439)를 콤마로 구분한 문자열
 * - e.g. 12:00,12:14,HELLO,CDEFGAB
 *
 * [예시 - 1]
 * m: "ABCDEFG"
 * musicinfos: ["12:00,12:14,HELLO,CDEFGAB", "13:00,13:05,WORLD,ABCDEF"]
 * 첫 번째 곡: CDEFGABCDEFGAB (14분) -> ABCDEFG가 들어있어서 (O)
 * 두 번째 곡: ABCDE(5분)
 *
 * [예시 - 2]
 * m: "CC#BCC#BCC#BCC#B"
 * musicinfos: ["03:00,03:30,FOO,CC#B", "04:00,04:08,BAR,CC#BCC#BCC#B"]
 * 첫 번째 곡: CC#BCC#BCC#BCC#BCC#BCC#BCC#BCC#BCC#BCC#B (30분) -> (O)
 * 두 번째 곡: CC#BCC#B (8분)
 *
 * [예시 - 3]
 * m: "ABC"
 * musicinfos: ["12:00,12:14,HELLO,C#DEFGAB", "13:00,13:05,WORLD,ABCDEF"]
 * 첫 번째 곡: C#DEFGABC#DEFGAB (14분)
 * 두 번째 곡: ABCDE (5분) -> (O)
 */

const noteToNumberMap = { 'C#': 1, 'D#': 2, 'F#': 3, 'G#': 4, 'A#': 5, 'B#': 6 };

const convertTimeToMinutes = timeString => {
  const [hours, minutes] = timeString.split(':').map(Number);
  return hours * 60 + minutes;
};

const calculateDurationInMinutes = (startTime, endTime) => {
  return Math.abs(convertTimeToMinutes(startTime) - convertTimeToMinutes(endTime));
};

const convertNotesToNumbers = notesString => {
  const pattern = /[A-G]#?/g;
  return notesString.replace(pattern, match => noteToNumberMap[match] ?? match);
};

const generatePlayedNoteSequence = (duration, sequence) => {
  let playedNotes = '';
  for (let i = 0; i < duration; i++) {
    playedNotes += sequence[i % sequence.length];
  }
  return playedNotes;
};

export function solution(melody, musicInfoArray) {
  const melodyAsNumbers = convertNotesToNumbers(melody);
  const melodyPattern = new RegExp(melodyAsNumbers, 'g');

  const result = musicInfoArray.reduce(
    (acc, musicInfo) => {
      const [start, end, title, sequence] = musicInfo.split(',');

      const duration = calculateDurationInMinutes(start, end);
      const sequenceAsNumbers = convertNotesToNumbers(sequence);
      const playedNoteSequence = generatePlayedNoteSequence(duration, sequenceAsNumbers);

      if (playedNoteSequence.match(melodyPattern) && duration > acc.duration) {
        return { duration, title };
      }
      return acc;
    },
    { duration: 0, title: '(None)' },
  );

  return result.title;
}

export const cases = [
  generateTestPair(['ABCDEFG', ['12:00,12:14,HELLO,CDEFGAB', '13:00,13:05,WORLD,ABCDEF']], 'HELLO'),
  generateTestPair(
    ['CC#BCC#BCC#BCC#B', ['03:00,03:30,FOO,CC#B', '04:00,04:08,BAR,CC#BCC#BCC#B']],
    'FOO',
  ),
  generateTestPair(['ABC', ['12:00,12:14,HELLO,C#DEFGAB', '13:00,13:05,WORLD,ABCDEF']], 'WORLD'),
  generateTestPair(['A', ['12:00,12:01,Sing,A', '12:00,12:01,Song,A']], 'Sing'),
  // 일치하는 음이 여러개이고 재생 시간도 같으면 먼저 입력된 음악 제목 반환
  generateTestPair(['A', ['12:00,12:01,Sing,A', '12:00,12:02,Song,A']], 'Song'),
  // 일치하는 음이 여러 개일 때 재생 시간이 가장 긴 음악 제목 반환
  generateTestPair(['A', ['12:00,12:01,Sing,A', '12:00,13:00,Song,A']], 'Song'),
  // 일치하는 음악이 없을 때
  generateTestPair(['A', ['12:00,12:01,Song,BA']], '(None)'),
];
