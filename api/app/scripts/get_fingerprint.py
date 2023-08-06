import acoustid
import sys
import json

file_path = sys.argv[1]

# Generate a fingerprint for the MP3 file
duration, fingerprint = acoustid.fingerprint_file(file_path)

class Response:
    def __init__(self, newDuration, newFingerprint):
        self.duration = newDuration
        self.fingerprint = newFingerprint.decode("utf-8")


output = Response(duration, fingerprint)
json_str = json.dumps(output.__dict__)

sys.stdout.write(json_str)
