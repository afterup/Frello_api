
export async function createSetPosition({whereObject, model}) {
  const MAX_UNSIGNED_SHORT = 65535;
  let position;

  const largestPosition = await model.findOne({
      limit: 1,
      where: whereObject,
      order: [['position', 'desc']]
  });
  largestPosition ? position = largestPosition.position + MAX_UNSIGNED_SHORT 
                  : position = MAX_UNSIGNED_SHORT;
  return position;
}

export async function createMovePosition({ bothPosition }) {
  const MAX_UNSIGNED_SHORT = 65535;
  let position;

  /*
    카드 혹은 리스트를 이동할 때 포지션 값을 생성하는 메소드입니다.
    각 요소의 양쪽에 요소가 존재 할 경우 프론트에서 양쪽 포지션 값을 전달받고 사이값이나 최대 최솟값을 얻게됩니다.  
    양쪽에 요소가 존재하지 않는 경우에는 기본값(MAX_UNSIGNED_SHORT)을 얻게됩니다.
  */
  if(bothPosition !== undefined) {
      const { leftPosition, rightPosition } = bothPosition;

      if(leftPosition) {
          if(rightPosition) {
              position = Math.floor(Math.random() 
                        * (rightPosition - leftPosition + 1) + leftPosition);
          }else {
              position = leftPosition + Math.floor(Math.random() * 5000);
          }
      }else {
          position = rightPosition - Math.floor(Math.random() * 5000);
      }
  }else { 
    position = MAX_UNSIGNED_SHORT; 
  }
  console.log(position);
  return position;
}

export async function duplicatePosition({whereObject, position, model, Op}){
  // 동일한 포지션이 존재하는 경우에는 값에서 0.1을 더해서 저장하였습니다. 
  const duplicatePosition = await model.findOne({ 
    where: { [Op.and]: [ whereObject , { position }] },
    order: [['position', 'desc']]
});

if(duplicatePosition) position = (duplicatePosition.dataValues.position + 0.1);
return position;
}