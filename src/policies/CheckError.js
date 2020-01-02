module.exports = {
    checkPostError(res, error) {
        switch(error.details[0].context.key) {
        case 'user_id':
            res.status(400).send({
                error: 'user_id를 확인해주세요'
            });
            break;
        case 'board_id':
            res.status(400).send({
                error: 'board_id를 확인해주세요'
            });
            break;
        case 'list_id':
            res.status(400).send({
                error: ' list_id가 필요합니다'
            });
            break;   
        case 'card_id':
            res.status(400).send({
                error: 'card_id 확인해주세요'
            });
            break;
        case 'favorite_id':
            res.status(400).send({
                error: 'favorite_id 확인해주세요'
            });
            break;
        case 'title':
            res.status(400).send({
                error: '제목을 확인해주세요'
            });
            break;
        case 'description':
            res.status(400).send({
                error: 'description을 확인해주세요'
            });
            break;
        case 'background':
            res.status(400).send({
                error: 'background를 확인해주세요'
            });
            break;
        case 'position':
            res.status(400).send({
                error: '포지션을 입력해주세요'
            });
            break;
        default:
            res.status(400).send({
                error: '오류가 발생했습니다'
            });
        }
    },

    checkAuthError(res, error) {
        switch(error.details[0].context.key) {
        case 'user_id':
            res.status(400).send({
                error: 'user_id를 확인해주세요'
            });
            break;
        case 'email':
            res.status(400).send({
                error: '이메일을 확인해주세요'
            });
            break;
        case 'username':
            res.status(400).send({
                error: '이름을 확인해주세요'
            });
            break;
        case 'password':
            res.status(400).send({
                error: '비밀번호를 확인해주세요'
            });
            break;
        default:
            res.status(400).send({
                error: '오류가 발생하였습니다'
            });
        }
    }
};