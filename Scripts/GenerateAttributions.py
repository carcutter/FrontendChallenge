#!/usr/bin/python

from urllib.error import HTTPError
from jsonschema import ValidationError, validate

import argparse
import enum
import json
import logging
import os
import sys

from enum import IntEnum

from json.decoder import JSONDecodeError

from urllib.request import urlopen


class ExitCode(IntEnum):
    Success = 0
    FileNotFound = 1
    InvalidInput = 2
    InvalidAttributions = 3


# Utilities


def file_path(path):
    if os.path.isfile(path):
        return path
    else:
        raise FileNotFoundError(path)


def die(message, code):
    print(message)
    sys.exit(code)


# Entry-point

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Attributions generator.")

    # Input/Output
    parser.add_argument(
        "schema",
        type=file_path,
        help="Attributions JSON schema file.",
    )
    parser.add_argument("attributions", type=file_path, help="Attributions JSON file.")

    # Optional arguments
    parser.add_argument(
        "-d",
        "--debug",
        help="Print lots of debugging statements.",
        action="store_const",
        dest="loglevel",
        const=logging.DEBUG,
        default=logging.WARNING,
    )
    parser.add_argument(
        "-v",
        "--verbose",
        help="Be verbose.",
        action="store_const",
        dest="loglevel",
        const=logging.INFO,
    )

    # Parse arguments
    try:
        args = parser.parse_args()
    except NotADirectoryError as e:
        die('Cannot access directory "%s".' % e, ExitCode.FileNotFound)

    # Set logging level
    logging.basicConfig(level=args.loglevel)

    # Load JSON
    try:
        with open(args.schema) as file:
            schema = json.load(file)
    except JSONDecodeError as e:
        die('Invalid schema: "%s".' % e, ExitCode.InvalidInput)

    try:
        with open(args.attributions) as file:
            attributions = json.load(file)
    except JSONDecodeError as e:
        die('Invalid attributions "%s".' % e, ExitCode.InvalidInput)

    # Validate against schema
    try:
        validate(attributions, schema)
    except ValidationError as e:
        die("Failed to validate attributions: %s" % e, ExitCode.InvalidAttributions)

    # Write attributions to stdout
    out = ""

    for dep in attributions:
        # Attempt to read the license text
        try:
            license_text = urlopen(dep["licenseText"]).read().decode("utf-8")
        except HTTPError as e:
            license_text = "INVALID licenseText URL"

        out += "\n\n\n".join([dep["name"], dep["website"], license_text])

    sys.stdout.buffer.write(out.encode("utf-8"))

    # All good
    sys.exit(ExitCode.Success)
