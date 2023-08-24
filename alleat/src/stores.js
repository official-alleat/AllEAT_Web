const stores = {
    1: {
        id: 1,
        name: "진주집",
        tag: "#닭칼국수 #콩국수",
        image: "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20150817_173%2F14398056331785xL5V_JPEG%2F166767593044276_21.jpg",
        location: "여의도동",
        tables: [[1, 2, 3, 4, 5], [0, 0, 6, 0, 7], [8, 9, 10, 11, 0]],
        menu: [{ image: "https://drive.google.com/uc?id=1x81RAOM6LKS8HHFP7ix9w1_eOPOp2Cvc", menu_name: "냉콩국수", price: 14000},
        { image: require("./assets/진주집/냉콩국수.jpg"), menu_name: "냉콩국수", price: 14000 },
        { image: require("./assets/진주집/비빔국수.jpg"), menu_name: "비빔국수", price: 11000 },
        { image: require("./assets/진주집/닭칼국수.jpg"), menu_name: "닭칼국수", price: 11000 },
        { image: require("./assets/진주집/접시만두.jpg"), menu_name: "접시만두", price: 11000 }],
    },
    2: {
        id: 2,
        name: "청미일식",
        tag: "#일식당 #초밥 #대구탕",
        image: "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20211118_127%2F1637200906939KiRYx_JPEG%2F20210930_195115.jpg",
        location: "여의도동",
        tables: [[1, 2, 3, 4, 0], [5, 6, 0, 0, 7], [8, 9, 0, 10, 0]],
        menu: [{ image: require("./assets/청미일식/초밥도시락(소).jpg"), menu_name: "초밥도시락(소)", price: 23000 },
        { image: require("./assets/청미일식/초밥도시락(중).jpg"), menu_name: "초밥도시락(중)", price: 29900 },
        { image: require("./assets/청미일식/대구탕.jpg"), menu_name: "대구탕", price: 14900 },
        { image: require("./assets/청미일식/대구탕.jpg"), menu_name: "대구탕(전복대구탕)", price: 19900 },
        { image: require("./assets/청미일식/회덮밥.jpg"), menu_name: "회덮밥(기본)", price: 10900 },
        { image: require("./assets/청미일식/회덮밥.jpg"), menu_name: "회덮밥(고급)", price: 22900 },]
    },
    3: {
        id: 3,
        name: "비스트로베름",
        tag: "#양식 #스테이크 #파스타",
        image: "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20220311_37%2F1646961042990hcUnr_JPEG%2F20220310_193612.jpg",
        location: "여의도동",
        tables: [[1, 2, 3, 4, 5], [0, 0, 6, 0, 7], [8, 9, 10, 11, 0]],
        menu: [{ image: require("./assets/비스트로베름/살치스테이크.jpg"), menu_name: "살치스테이크", price: 39000 },
        { image: require("./assets/비스트로베름/그릴치킨샐러드.jpg"), menu_name: "그릴치킨샐러드", price: 20000 },
        { image: require("./assets/비스트로베름/청양목살크림파스타.jpg"), menu_name: "청양목살크림파스타", price: 22000 },
        { image: require("./assets/비스트로베름/해물토마토파스타.jpg"), menu_name: "해물토마토파스타", price: 21000 },
        { image: require("./assets/비스트로베름/감바스 알 아히요.jpg"), menu_name: "감바스 알 아히요", price: 19000 },]
    },
    4: {
        id: 4,
        name: "여의화로",
        tag: "#삼겹살 #청국장 #파불고기",
        image: "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20230718_140%2F1689613364139IPtqY_JPEG%2FKakaoTalk_20230718_015913475.jpg",
        location: "여의도동",
        tables: [[1, 2, 3, 4, 5], [0, 0, 6, 0, 7], [8, 9, 10, 11, 0]],
        menu: [{ image: require("./assets/여의화로/삼겹살.jpg"), menu_name: "삼겹살", price: 17000 },
        { image: require("./assets/여의화로/목살.jpg"), menu_name: "목살", price: 17000 },
        { image: require("./assets/여의화로/오겹살.jpg"), menu_name: "오겹살", price: 18000 },
        { image: require("./assets/여의화로/등심.jpg"), menu_name: "등심", price: 20000 },
        { image: require("./assets/여의화로/파불고기.jpg"), menu_name: "파불고기", price: 10000 },
        { image: require("./assets/여의화로/청국장.jpg"), menu_name: "청국장", price: 10000 },],
    },
    5: {
        id: 5,
        name: "주옥발",
        tag: "#족발 #누룽지 #보쌈",
        image: "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20230728_177%2F1690532127880dAUtb_JPEG%2FDSC_677911.JPG",
        location: "여의도동",
        tables: [[1, 2, 3, 4, 5], [0, 0, 6, 0, 7], [8, 9, 10, 11, 0]],
        menu: [{ image: require("./assets/주옥발/누룽지 주옥발.jpg"), menu_name: "누룽지 주옥발", price: 45000 },
        { image: require("./assets/주옥발/주옥발.jpg"), menu_name: "주옥발", price: 39000 },
        { image: require("./assets/주옥발/불주옥발.jpg"), menu_name: "불주옥발", price: 29000 },
        { image: require("./assets/주옥발/주옥보쌈.jpg"), menu_name: "주옥보쌈", price: 39000 },
        { image: require("./assets/주옥발/주옥곰탕.jpg"), menu_name: "주옥곰탕", price: 10000 },
        { image: require("./assets/주옥발/주옥라면.png"), menu_name: "주옥라면", price: 9000 },],
    },
    "6": {
        "id": "6",
        "name": "젊음의 행진",
        "tag": "#젊음 #행진",
        "image": "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20190811_137%2F1565516470430keuSr_JPEG%2FhAmOKHhFlM9erWJVVtA-S-z_.jpg",
        "location": "서울특별시",
        "tables": [[1, 2, 3, 4, 5], [0, 0, 6, 0, 7], [8, 9, 10, 11, 0]]
    },
    "7": {
        "id": "7",
        "name": "투비위드유",
        "tag": "#투비 #위드유",
        "image": "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20201123_168%2F1606109553145p4nME_JPEG%2F7BQPf6KTCbYFV7cAxrJs8GFc.jpeg.jpg",
        "location": "서울특별시",
        "tables": [[1, 2, 3, 4, 5], [0, 0, 6, 0, 7], [8, 9, 10, 11, 0]]
    },
    "8": {
        "id": "8",
        "name": "찰리주막",
        "tag": "#찰리 #주막",
        "image": "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20210705_150%2F1625462100838q5ddU_JPEG%2FIk5FTf54n8uEAhNFzqSOgxT3.jpg",
        "location": "서울특별시",
        "tables": [[1, 2, 3, 4, 5], [0, 0, 6, 0, 7], [8, 9, 10, 11, 0]]
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