import os
import pymongo


DATABASE_URL = os.environ.get("DATABASE_URL")
client = pymongo.MongoClient(DATABASE_URL)


class Queries:
    @property
    def collection(self):
        db = client[self.DB_NAME]
        return db[self.COLLECTION]
