from fastapi import FastAPI

app = FastAPI()

@app.get("/api/")
def root():
    return {"message": "Bradwear Landing API"}

@app.get("/api/health")
def health():
    return {"status": "ok"}
