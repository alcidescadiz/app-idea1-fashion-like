"use strict"
let   users= [
    {
      "id": "59363a3f-cfbf-48bd-bf9b-37d3e6ce834b",
      "like": [
        "8a94a788-37af-4903-a10b-5d966123e6a9",
        "52f53a31-effc-40aa-9006-4f1c679bf3f9"
      ],
      "dislike": []
    },
    {
      "id": "4fa6c184-125e-4600-8359-3324fc2bebea",
      "like": ["8a94a788-37af-4903-a10b-5d966123e6a9", "6065655d-ef7d-41ed-82bf-4d74c252255e"],
      "dislike": []
    },
    {
      "id": "4fa6c184-127e-4600-8359-3324fc2bebea",
      "like": ["52f53a31-effc-40aa-9006-4f1c679bf3f9",
        "bb7d8591-87ed-4a3a-a8d8-5400603e02c5"],
      "dislike": []
    },
    {
      "id": "4fa6c184-128e-4600-8359-3324fc2bebea",
      "like": ["8af2d9d2-a2b5-47af-97df-6623a057d9e3"],
      "dislike": []
    },
    {
      "id": "4fa6c184-129e-4600-8359-3324fc2bebea",
      "like": ["8a94a788-37af-4903-a10b-5d966123e6a9", "6065655d-ef7d-41ed-82bf-4d74c252255e"],
      "dislike": ["6065655d-ef7d-41ed-82bf-4d74c252255e"]
    },
    {
      "id": "4fa6c184-130e-4600-8359-3324fc2bebea",
      "like": [
        "8af2d9d2-a2b5-47af-97df-6623a057d9e3",
        "bb7d8591-87ed-4a3a-a8d8-5400603e02c5"],
      "dislike": ["8a94a788-37af-4903-a10b-5d966123e6a9",
    "6065655d-ef7d-41ed-82bf-4d74c252255e"]
    },
    {
        "id": "4fa6c184-131e-4600-8359-3324fc2bebea",
        "like": [
          "8af2d9d2-a2b5-47af-97df-6623a057d9e3",
          "bb7d8591-87ed-4a3a-a8d8-5400603e02c5"],
        "dislike": ["8a94a788-37af-4903-a10b-5d966123e6a9",
      "6065655d-ef7d-41ed-82bf-4d74c252255e"]
      }
  ]


export function postStadistic(users=[]) {
    let topTenArray  = {
        like : {},
        dislike: {}
    }
    users.forEach(e =>{
        e.like.map(p =>{
            topTenArray["like"][p] = topTenArray["like"][p] +1 || 1
        }) 
        e.dislike.map(p =>{
            topTenArray["dislike"][p] = topTenArray["dislike"][p] +1 || 1
        }) 
    })
    topTenArray.like= Object.entries(topTenArray.like).sort((p,e)=> e[1]-p[1])
    topTenArray.dislike= Object.entries(topTenArray.dislike).sort((p,e)=> e[1]-p[1])
    return topTenArray
}

