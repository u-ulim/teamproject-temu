const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

// JSON 파일 읽기
const rawData = fs.readFileSync("db.json");
const data = JSON.parse(rawData);

// UUID 추가
data.products = data.products.map((product) => ({
  id: uuidv4(),
  ...product,
}));

// 수정된 JSON 파일 저장
fs.writeFileSync("db.json", JSON.stringify(data, null, 2));

console.log("UUIDs added to products in db.json");
