const { Router } = require('express');
const patientRouter = Router();
const { Patient, Brief, Condition, Drug, Visit } = require('../models');

patientRouter.get('/', async (req, res) => {
    try {
        const {
            length,
            page,
            order_column,
            order_desc,
            gender,
            race,
            ethnicity,
            age_min,
            age_max,
            death
        } = req.query;

        let ageQuery = {};
        if (age_min !== undefined) ageQuery.$gte = parseInt(age_min);
        if (age_max !== undefined) ageQuery.$lte = parseInt(age_max);

        const query = {
            [gender !== undefined && 'gender']: gender,
            [race !== undefined && 'race']: { $in: race && race.split(',') },
            [ethnicity !== undefined && 'ethnicity']: ethnicity,
            [Object.keys(ageQuery).length !== 0 && 'age']: ageQuery,
            [death !== undefined && 'isDeath']: death === "Y" ? true : false
        }
        const sort = order_column && {
            [order_column]: order_desc
        }

        const patients = await Patient.find(query)
            .sort(sort)
            .skip(length * page)
            .limit(length);
        const totalLength = await Patient.find(query).countDocuments();

        return res.send({ patients, page: parseInt(page) + 1, totalLength });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ error: err.message });
    }
});

patientRouter.get('/:personID', async (req, res) => {
    try {
        const { personID } = req.params;
        let briefs = await Brief.findOne({ personID: parseInt(personID) });

        return res.send(
            {
                conditionList: briefs.conditionList,
                visitCount: briefs.visitCount
            }
        );
    } catch (err) {
        console.log(err);
        return res.status(500).send({ error: err.message });
    }
});

patientRouter.get('/:personID/condition', async (req, res) => {
    try {
        const { personID } = req.params;
        let conditions = await Condition.findOne({ personID: parseInt(personID) });

        return res.send({ conditionList: conditions.conditionList });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ error: err.message });
    }
});

patientRouter.get('/:personID/drug', async (req, res) => {
    try {
        const { personID } = req.params;
        let drugs = await Drug.findOne({ personID: parseInt(personID) });

        return res.send({ drugList: drugs.drugList });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ error: err.message });
    }
});

patientRouter.get('/:personID/visit', async (req, res) => {
    try {
        const { personID } = req.params;
        let visits = await Visit.findOne({ personID: parseInt(personID) });

        return res.send({ visitList: visits.visitList });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ error: err.message });
    }
});

module.exports = { patientRouter }



/**
   * @swagger
   *  /patient:
   *    get:
   *      summary: "환자 리스트 조회"
   *      tags: [patient]
   *      parameters:
   *        - in: query
   *          name: length
   *          description: 한 페이지당 불러올 갯수 (입력안하면 전체(1000개) 불러옴)
   *          required: false
   *          schema:
   *              type: number
   *        - in: query
   *          name: page
   *          description: 페이지 수 (첫페이지는 0 / 입력안하면 첫번째 페이지 불러옴)
   *          required: false
   *          schema:
   *              type: number
   *        - in: query
   *          name: order_column
   *          description: 정렬할 컬럼명
   *          required: false
   *          schema:
   *              type: string
   *        - in : query
   *          name: order_desc
   *          description: 내림차순 여부 - order_column값 필수 ( 내림차순 -1 / 오름차순 미입력 )
   *          required: false
   *          schema:
   *              type: number
   *        - in: query
   *          name: gender
   *          description: 성별검색 필터 (남자 M / 여자 F) - /list/gender 참조
   *          required: false
   *          schema:
   *              type: string
   *        - in: query
   *          name: race
   *          description: 인종검색 필터 ( other, native, black, white, asian ) / 다중검색 가능 - 점으로 구분 ex) black,asian / /list/race 참조
   *        - in: query
   *          name: ethnicity
   *          description: 민족검색 필터 (hispanic / nonispanic) - /list/ethnicity 참조
   *          required: false
   *          schema:
   *              type: string
   *        - in: query
   *          name: age_min
   *          description: 나이검색(최소나이 설정)
   *          required: false
   *          schema:
   *              type: number
   *        - in: query
   *          name: age_max
   *          description: 나이검색(최대나이 설정)
   *          required: false
   *          schema:
   *              type: number
   *        - in: query
   *          name: death
   *          description: 사망여부 (사망 Y / 생존 N)
   *          required: false
   *          schema:
   *              type: string
   *      responses:
   *        "200":
   *          description: 전체 환자 정보 (파라미터 page=0)
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                    patients:
   *                      type: array
   *                      example:
   *                          [
   *                            {
   *                              "_id": "626bf4e716312b00cf524606",
   *                              "age": 25,
   *                              "birthDatetime": "1997-04-18 00:00:00",
   *                              "ethnicity": "hispanic",
   *                              "gender": "F",
   *                              "isDeath": false,
   *                              "personID": 402435,
   *                              "race": "white"
   *                             },
   *                             ...
   *                          ]
   *                    page:
   *                      type: number
   *                      example: 1
   *                    totalLength:
   *                      type: number
   *                      example: 1000
  */



/**
 * @swagger
 * /patient/{personID}:
 *  get:
 *    summary: "특정 환자 상세조회"
 *    tags: [patient]
 *    parameters:
 *      - in: path
 *        name: personID
 *        required: true
 *        description: 유저 아이디
 *        schema:
 *          type: number
 *    responses:
 *      "200":
 *        description: personID 402435 환자 조회
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                conditionList:
 *                  type: array
 *                  example: 
 *                      [
 *                       "No matching concept",
 *                       "No matching concept",
 *                       "Acute bronchitis",
 *                       "Fever",
 *                       "Appendicitis",
 *                       "Acute viral pharyngitis",
 *                       "Acute viral pharyngitis",
 *                       "Sore throat symptom",
 *                       "Facial laceration",
 *                       "Fatigue",
 *                       "Disease caused by 2019-nCoV",
 *                       "Viral sinusitis",
 *                       "Viral sinusitis"
 *                      ]
 *                visitCount:
 *                  type: number
 *                  example: 79
*/



/**
 * @swagger
 * /patient/{personID}/condition:
 *  get:
 *    summary: "특정 환자 건강상태"
 *    tags: [patient]
 *    parameters:
 *      - in: path
 *        name: personID
 *        required: true
 *        description: 유저 아이디
 *        schema:
 *          type: number
 *    responses:
 *      "200":
 *        description: personID 402435 환자 조회
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                conditionList:
 *                  type: array
 *                  example: 
 *                      [
 *                       {
 *                        "conditionConceptID": 0,
 *                        "conditionConceptName": "No matching concept",
 *                        "conditionEndDate": null,
 *                        "conditionStartDate": "2004-04-17",
 *                        "visitID": 1198130
 *                       },
 *                      ...
 *                     ]
*/



/**
 * @swagger
 * /patient/{personID}/drug:
 *  get:
 *    summary: "특정 환자 투약정보"
 *    tags: [patient]
 *    parameters:
 *      - in: path
 *        name: personID
 *        required: true
 *        description: 유저 아이디
 *        schema:
 *          type: number
 *    responses:
 *      "200":
 *        description: personID 402435 환자 조회
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                drugList:
 *                  type: array
 *                  example: 
 *                      [
 *                       {
 *                        "drugConceptID": 40223821,
 *                        "drugConceptName": "fexofenadine hydrochloride 30 MG Oral Tablet",
 *                        "drugEndDate": "1998-04-01",
 *                        "drugStartDate": "1998-04-01",
 *                        "visitID": 92557045
 *                       },
 *                      ...
 *                     ]
*/



/**
 * @swagger
 * /patient/{personID}/visit:
 *  get:
 *    summary: "특정 환자 내방정보"
 *    tags: [patient]
 *    parameters:
 *      - in: path
 *        name: personID
 *        required: true
 *        description: 유저 아이디
 *        schema:
 *          type: number
 *    responses:
 *      "200":
 *        description: personID 402435 환자 조회
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                visitList:
 *                  type: array
 *                  example: 
 *                      [
 *                       {
 *                        "visitConceptID": 9201,
 *                        "visitConceptName": "Inpatient Visit",
 *                        "visitEndDate": "2004-04-21",
 *                        "visitID": 1198130,
 *                        "visitStartDate": "2004-04-17"
 *                       },
 *                      ...
 *                     ]
*/