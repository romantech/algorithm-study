import { generateTestPair } from '../../utils.js';

/**
 * [요구사항]
 * 채팅방에 들어오고 나가거나, 닉네임을 변경한 기록이 담긴 배열 record가 주어질 때
 * 모든 기록이 처리된 후 최종적으로 방을 개설한 사람이 보게되는 메시지를 문자열 배열 형태로 리턴
 *
 * 채팅방에 누군가 들어오면 "[닉네임]님이 들어왔습니다" 메시지 출력하고,
 * 누군가 나가면 "[닉네임]님이 나갔습니다" 메시지 출력
 * 아래 2가지 방법으로 닉네임 변경 가능.
 * 1.채팅방을 나간 후, 새로운 닉네임으로 다시 들어간다
 * 2.채팅방에서 닉네임을 변경한다
 * 닉네임 변경시 기존 채팅방에 출력됐던 닉네임도 전부 변경되고 중복 닉네임 허용
 *
 * [예시]
 * "Muzi님이 들어왔습니다"
 * "Prodo님이 들어왔습니다"
 * (Muzi 유저 채팅방 나감)
 * "Muzi님이 나갔습니다"
 * (채팅방을 나간 Muzi 유저가 Prodo 닉네임으로 변경 -> 기존 채팅방 닉네임도 변경)
 *  ---
 * "Prodo님이 들어왔습니다" (기존 Muzi)
 * "Prodo님이 들어왔습니다"
 * "Prodo님이 나갔습니다" (기존 Muzi)
 * "Prodo님이 들어왔습니다" (기존 Muzi)
 * (두 번째 Prodo가 닉네임을 Ryan으로 변경)
 * "Prodo님이 들어왔습니다" (기존 Muzi)
 * "Prodo님이 들어왔습니다" (기존 Prodo)
 * "Prodo님이 나갔습니다" (기존 Muzi)
 * "Prodo님이 들어왔습니다" (기존 Muzi)
 *
 * [제한 사항]
 * record 파라미터: 문자열이 담긴 배열, 배열 길이는 1 이상 100,000 이하
 * 각 요소: Enter|Leave|Change [아이디][닉네임] 형태. e.g. "Enter uid1234 Muzi"
 * 각 단어는 공백으로 구분되고, 알파벳 대소문자 및 숫자로만 이루어져 있음
 * 유저 아이디와 닉네임은 알파벳 대소문자 구분
 * 유저 아이디 닉네임 길이 1 이상 10이하
 */

export function solution(record) {
  const latestNicks = {};
  const actionMessage = { Enter: '님이 들어왔습니다.', Leave: '님이 나갔습니다.' };
  const result = [];

  record.forEach(log => {
    const [action, id, nick] = log.split(' ');

    if (nick) latestNicks[id] = nick;
    if (action !== 'Change') result.push({ id, message: actionMessage[action] });
  });

  return result.map(({ id, message }) => `${latestNicks[id]}${message}`);
}

export const cases = [
  generateTestPair(
    [
      [
        'Enter uid1234 Muzi',
        'Enter uid4567 Prodo',
        'Leave uid1234',
        'Enter uid1234 Prodo',
        'Change uid4567 Ryan',
      ],
    ],
    [
      'Prodo님이 들어왔습니다.',
      'Ryan님이 들어왔습니다.',
      'Prodo님이 나갔습니다.',
      'Prodo님이 들어왔습니다.',
    ],
  ),
];

/**
 * "Muzi(uid1234)님이 들어왔습니다"
 *
 * "Muzi(uid1234)님이 들어왔습니다",
 * "Prodo(uid4567)님이 들어왔습니다"
 *
 * "Muzi(uid1234)님이 들어왔습니다",
 * "Prodo(uid4567)님이 들어왔습니다",
 * "Muzi(uid1234)님이 나갔습니다"
 *
 * "Prodo(uid1234)님이 들어왔습니다",
 * "Prodo(uid4567)님이 들어왔습니다",
 * "Prodo(uid1234)님이 나갔습니다"
 * "Prodo(uid1234)님이 들어왔습니다",
 *
 * "Prodo(uid1234)님이 들어왔습니다",
 * "Ryan(uid4567)님이 들어왔습니다",
 * "Prodo(uid1234)님이 나갔습니다"
 * "Prodo(uid1234)님이 들어왔습니다",
 */
