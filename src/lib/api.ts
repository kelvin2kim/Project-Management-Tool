//to make http requests to the server
const fetcher = async ({ url, method, body, json = true }) => {
  //console.log('test2')
  const res = await fetch(url, {
    method,
    body: body && JSON.stringify(body),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }
  );

  //console.log(res.body)

  if (!res.ok) {
    console.log(res);
    throw new Error("API Error");
  }

  if (json) {
    const data = await res.json();
   console.log(data)
    return data;
  }
};

//Above, res.json() parses the response body from a fetch request as a JSON file
export const register = async (user) => {
  return fetcher({
    url: "/api/register",
    method: "POST",
    body: user,
    json: false,
  });
};

export const signin = async (user) => {
  //console.log('test')
  return fetcher({
    url: "/api/signin",
    method: "POST",
    body: user,
    json: false,
  });
};

export const newProject = async (name) => {
  return fetcher({
    url: "/api/project",
    method: "POST",
    body: { name },
  });
}

export const finishProject = async (project) => {
  return fetcher({
    url: "/api/reset",
    method: "POST",
    body: project,
  });
}

export const newTask = async (input) => {
  return fetcher({
    url: "/api/task",
    method: "POST",
    body: input,
  });
}