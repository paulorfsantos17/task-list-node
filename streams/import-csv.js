import { parse } from 'csv-parse'
import fs from 'fs'

const fileCsv = new URL('./tasks.csv', import.meta.url)


const stream = fs.createReadStream(fileCsv)

const parseCsv = parse({
  delimiter: ',',
  skip_empty_lines: true,
  from_line: 2
})

async function run() {

  const linesParse = stream.pipe(parseCsv)

  for await (const line of linesParse) {
    const [title, description] = line

    await fetch('http://localhost:3333/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, description })
    })

  }
}

run()