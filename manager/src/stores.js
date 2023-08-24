const stores = {
    1: {
        id: 1,
        name: "진주집",
        password: "1234",
        tag: "#닭칼국수 #콩국수",
        image: "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20150817_173%2F14398056331785xL5V_JPEG%2F166767593044276_21.jpg",
        location: "여의도동",
        tables: [[1, 2, 3, 4, 5], [0, 0, 6, 0, 7], [8, 9, 10, 11, 0]]
    },
    2: {
        id: 2,
        name: "청미일식",
        password: "1234",
        tag: "#일식당 #초밥 #대구탕",
        image: "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20211118_127%2F1637200906939KiRYx_JPEG%2F20210930_195115.jpg",
        location: "여의도동",
        tables: [[1, 2, 3, 4, 0], [5, 6, 0, 0, 7], [8, 9, 0, 10, 0]],
    },
    3: {
        id: 3,
        name: "비스트로베름",
        password: "1234",
        tag: "#양식 #스테이크 #파스타",
        image: "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20220311_37%2F1646961042990hcUnr_JPEG%2F20220310_193612.jpg",
        location: "여의도동",
        tables: [[1, 2, 3, 4, 5], [0, 0, 6, 0, 7], [8, 9, 10, 11, 0]],
    },
    4: {
        id: 4,
        name: "여의화로",
        password: "1234",
        tag: "#삼겹살 #청국장 #파불고기",
        image: "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20230718_140%2F1689613364139IPtqY_JPEG%2FKakaoTalk_20230718_015913475.jpg",
        location: "여의도동",
        tables: [[1, 2, 3, 4, 5], [0, 0, 6, 0, 7], [8, 9, 10, 11, 0]],
    },
    5: {
        id: 5,
        name: "주옥발",
        password: "1234",
        tag: "#족발 #누룽지 #보쌈",
        image: "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20230728_177%2F1690532127880dAUtb_JPEG%2FDSC_677911.JPG",
        location: "여의도동",
        tables: [[1, 2, 3, 4, 5], [0, 0, 6, 0, 7], [8, 9, 10, 11, 0]],
    },
    6: {
        id: 6,
        name: "베어글 여의도",
        password: "1234",
        tag: "#샌드위치 #브런치",
        image: "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20230816_293%2F1692196826911XSRrH_JPEG%2FA7613875-C93F-4D66-925A-980A7909B147.jpeg",
        location: "여의도동",
        tables: [[1, 2, 3, 4, 5], [6, 7, 8, 0, 0], [9, 10, 0, 11, 12]],
    },
    7: {
        id: 7,
        name: "단아",
        password: "1234",
        tag: "#한식 #솥밥정식",
        image: "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20200414_222%2F1586847257310CqrxV_JPEG%2F%25C5%25A9%25B1%25E2%25BA%25AF%25C8%25AFKakaoTalk_20200414_094830237_19.jpg",
        location: "여의도동",
        tables: [[1, 2, 3, 4, 5], [6, 7, 8, 0, 0], [9, 10, 0, 11, 12]],
    },
    8: {
        id: 8,
        name: "한가로이",
        password: "1234",
        tag: "#한정식 #솥밥정식",
        image: "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20230823_170%2F1692797961115U3h3u_PNG%2F1692791679182.png",
        location: "여의도동",
        tables: [[1, 2, 3, 4, 5], [6, 7, 8, 0, 0], [9, 10, 0, 11, 12]],
    },
    "9": {
        "id": "9",
        "name": "향꽃",
        "tag": "#향 #꽃",
        "image": "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20200626_76%2F159317801514034drF_JPEG%2FR6QcbX7Xht27SbgvnbuukTdI.jpg",
        "location": "서울특별시",
        "tables": [[1, 2, 3, 4, 5], [0, 0, 6, 0, 7], [8, 9, 10, 11, 0]]
    },
    "10": {
        "id": "10",
        "name": "단골손님",
        "tag": "#단골 #손님",
        "image": "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20230526_254%2F1685090821448uFfuX_JPEG%2F20230526_174428.jpg",
        "location": "서울특별시",
        "tables": [[1, 2, 3, 4, 5], [0, 0, 6, 0, 7], [8, 9, 10, 11, 0]]
    },
    "11": {
        "id": "11",
        "name": "빠빠빠 치킨",
        "tag": "#빠 #빠빠 #치킨",
        "image": "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20180330_124%2F1522375842521X9twO_PNG%2FqzMXrxLio43nP-dhoP9Mp7nD.png",
        "location": "서울특별시",
        "tables": [[1, 2, 3, 4, 5], [0, 0, 6, 0, 7], [8, 9, 10, 11, 0]]
    },
    "12": {
        "id": "12",
        "name": "빠빠빠 치킨",
        "tag": "#빠 #빠빠 #치킨",
        "image": "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20180330_124%2F1522375842521X9twO_PNG%2FqzMXrxLio43nP-dhoP9Mp7nD.png",
        "location": "서울특별시",
        "tables": [[1, 2, 3, 4, 5], [0, 0, 6, 0, 7], [8, 9, 10, 11, 0]]
    }
};

export default stores